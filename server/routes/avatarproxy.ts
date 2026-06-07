import { getRepository } from '@server/datasource';
import { User } from '@server/entity/User';
import ImageProxy from '@server/lib/imageproxy';
import logger from '@server/logger';
import { Router } from 'express';
import gravatarUrl from 'gravatar-url';

const router = Router();

let _avatarImageProxy: ImageProxy | null = null;

async function getAvatarImageProxy() {
  if (!_avatarImageProxy) {
    _avatarImageProxy = new ImageProxy('avatar', '');
  }
  return _avatarImageProxy;
}

export async function checkAvatarChanged(): Promise<{
  changed: boolean;
  etag?: string;
}> {
  return { changed: false };
}

router.get('/:jellyfinUserId', async (req, res) => {
  try {
    const user = await getRepository(User).findOne({
      where: { jellyfinUserId: req.params.jellyfinUserId },
    });

    const fallbackUrl = gravatarUrl(user?.email || 'none', {
      default: 'mm',
      size: 200,
    });

    const avatarImageCache = await getAvatarImageProxy();
    const imageData = await avatarImageCache.getImage(fallbackUrl);

    const userEtag = req.headers['if-none-match'];
    if (userEtag && userEtag === `"${imageData.meta.etag}"`) {
      return res.status(304).end();
    }

    res.writeHead(200, {
      'Content-Type': `image/${imageData.meta.extension}`,
      'Content-Length': imageData.imageBuffer.length,
      'Cache-Control': `public, max-age=${imageData.meta.curRevalidate}`,
      ETag: `"${imageData.meta.etag}"`,
      'OS-Cache-Key': imageData.meta.cacheKey,
      'OS-Cache-Status': imageData.meta.cacheMiss ? 'MISS' : 'HIT',
    });

    res.end(imageData.imageBuffer);
  } catch (e) {
    logger.error('Failed to proxy avatar image', {
      errorMessage: e.message,
    });
  }
});

export default router;
