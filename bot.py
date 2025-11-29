from flask import Flask, jsonify, request
import yt_dlp
import requests
import re

app = Flask(__name__)

def get_real_download_links(video_id):
    """الحل الوحيد الذي يعمل - استخدام مواقع تحميل"""
    download_sites = [
        f"https://yt5s.com/en32?q=https://youtube.com/watch?v={video_id}",
        f"https://en.y2mate.guru/youtube/{video_id}",
        f"https://ssyoutube.com/watch?v={video_id}",
        f"https://loadmp4.com/en/?v={video_id}"
    ]
    
    return {
        'video_id': video_id,
        'working_download_sites': download_sites,
        'direct_watch': f"https://www.youtube.com/watch?v={video_id}",
        'note': '⚠️ يوتيوب تمنع السيرفرات من جلب الروابط المباشرة',
        'solution': 'استخدم المواقع أعلاه للتحميل أو yt-dlp محلياً'
    }

@app.route('/')
def home():
    return "🎯 YouTube Bot - استخدم /get_links?url=رابط_اليوتيوب"

@app.route('/get_links', methods=['GET'])
def get_links():
    url = request.args.get('url')
    
    if not url:
        return jsonify({'error': 'أرسل رابط اليوتيوب'})
    
    try:
        # استخراج video ID
        video_match = re.search(r'(?:youtube\.com/watch\?v=|youtu\.be/)([^&?\s]+)', url)
        if not video_match:
            return jsonify({'error': 'رابط يوتيوب غير صحيح'})
        
        video_id = video_match.group(1)
        
        # محاولة yt-dlp أولاً
        try:
            ydl_opts = {
                'quiet': True,
                'no_warnings': True,
                'extract_flat': False,
            }
            
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=False)
                
                # البحث عن رواقع حقيقية
                real_links = []
                for f in info['formats']:
                    if f.get('url') and not f.get('format_note', '').startswith('storyboard'):
                        # التحقق من أن الرابط حقيقي
                        if any(domain in f['url'] for domain in ['googlevideo.com', 'youtube.com']):
                            real_links.append({
                                'url': f['url'],
                                'quality': f.get('format_note', 'unknown'),
                                'type': 'audio' if f.get('vcodec') == 'none' else 'video',
                                'valid': True
                            })
                
                if real_links:
                    return jsonify({
                        'title': info.get('title', ''),
                        'duration': info.get('duration', 0),
                        'real_links': real_links[:5],  # أول 5 رواقع فقط
                        'note': 'جرب هذه الرواقع أو استخدم المواقع أدناه'
                    })
                
        except Exception as e:
            pass  # ننتقل للحل البديل
        
        # الحل البديل - مواقع تحميل تعمل
        return jsonify(get_real_download_links(video_id))
            
    except Exception as e:
        return jsonify({'error': f'خطأ: {str(e)}'})

@app.route('/health')
def health():
    return jsonify({'status': 'active', 'message': 'البوت شغال'})

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
