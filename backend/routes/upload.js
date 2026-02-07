import express from 'express';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Upload image to Cloudflare Images
router.post('/image', protect, async (req, res) => {
  try {
    const { image } = req.body; // Base64 image data
    
    if (!image) {
      return res.status(400).json({ 
        success: false, 
        message: 'Image data is required' 
      });
    }

    // Cloudflare Images API endpoint
    const cloudflareAccountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const cloudflareApiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!cloudflareAccountId || !cloudflareApiToken) {
      return res.status(500).json({ 
        success: false, 
        message: 'Cloudflare credentials not configured' 
      });
    }

    // Convert base64 to buffer
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Create form data
    const formData = new FormData();
    const blob = new Blob([buffer]);
    formData.append('file', blob);

    // Upload to Cloudflare
    const uploadResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${cloudflareAccountId}/images/v1`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${cloudflareApiToken}`
        },
        body: formData
      }
    );

    const uploadData = await uploadResponse.json();

    if (!uploadData.success) {
      console.error('Cloudflare upload error:', uploadData);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to upload image to Cloudflare',
        error: uploadData.errors
      });
    }

    // Return the image URL
    res.json({
      success: true,
      data: {
        id: uploadData.result.id,
        url: uploadData.result.variants[0], // Full size URL
        thumbnail: uploadData.result.variants.find(v => v.includes('thumbnail')) || uploadData.result.variants[0]
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during upload',
      error: error.message 
    });
  }
});

// Delete image from Cloudflare
router.delete('/image/:imageId', protect, async (req, res) => {
  try {
    const { imageId } = req.params;
    
    const cloudflareAccountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const cloudflareApiToken = process.env.CLOUDFLARE_API_TOKEN;

    const deleteResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${cloudflareAccountId}/images/v1/${imageId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${cloudflareApiToken}`
        }
      }
    );

    const deleteData = await deleteResponse.json();

    if (!deleteData.success) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to delete image from Cloudflare' 
      });
    }

    res.json({ success: true, message: 'Image deleted successfully' });

  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during deletion' 
    });
  }
});

export default router;
