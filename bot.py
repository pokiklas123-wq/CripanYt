from flask import Flask, jsonify, request
import yt_dlp
import os

app = Flask(__name__)

def get_video_info(url):
    # إعدادات yt-dlp لمحاكاة تطبيق أندرويد (أقل عرضة للحظر)
    ydl_opts = {
        'format': 'best',  # محاولة جلب أفضل صيغة
        'quiet': True,
        'no_warnings': True,
        'noplaylist': True,
        'extract_flat': False,
        # استخدام عميل أندرويد لتجاوز بعض قيود السرعة
        'extractor_args': {
            'youtube': {
                'player_client': ['android', 'web'],
            }
        },
        # محاولة تجاوز مشاكل الشبكة
        'socket_timeout': 30,
        'retries': 10,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            return info
    except Exception as e:
        print(f"Error extracting info: {e}")
        return None

@app.route('/')
def home():
    return "Bot is running! Use /get_links?url=YOUR_YOUTUBE_URL"

@app.route('/get_links', methods=['GET'])
def get_links():
    url = request.args.get('url')
    
    if not url:
        return jsonify({'error': 'Please provide a YouTube URL'}), 400
    
    # تنظيف الرابط
    if '&' in url:
        url = url.split('&')[0]

    info = get_video_info(url)
    
    if not info:
        return jsonify({'error': 'Failed to fetch video info. YouTube might be blocking the server IP.'}), 500

    # تجهيز النتائج
    result = {
        'title': info.get('title'),
        'duration': info.get('duration'),
        'thumbnail': info.get('thumbnail'),
        'uploader': info.get('uploader'),
        'view_count': info.get('view_count'),
        'links': []
    }

    formats = info.get('formats', [])
    
    # تصفية وتصنيف الروابط
    for f in formats:
        # تجاهل روابط الـ Storyboard (الصور المصغرة للشريط الزمني)
        if 'storyboard' in f.get('format_note', '').lower() or 'sb' in f.get('format_id', ''):
            continue
            
        # التأكد من وجود رابط
        video_url = f.get('url')
        if not video_url:
            continue

        # تحديد النوع (فيديو، صوت، أو فيديو بدون صوت)
        ftype = 'unknown'
        vcodec = f.get('vcodec', 'none')
        acodec = f.get('acodec', 'none')
        
        if vcodec != 'none' and acodec != 'none':
            ftype = 'video_with_audio' # فيديو كامل
        elif vcodec != 'none' and acodec == 'none':
            ftype = 'video_only' # فيديو صامت (جودات عالية)
        elif vcodec == 'none' and acodec != 'none':
            ftype = 'audio_only' # صوت فقط

        # حجم الملف (تقريبي)
        filesize = f.get('filesize') or f.get('filesize_approx')
        
        link_data = {
            'type': ftype,
            'quality': f.get('format_note', f.get('height', 'unknown')),
            'ext': f.get('ext'),
            'url': video_url,
            'filesize': filesize,
            'format_id': f.get('format_id')
        }
        
        result['links'].append(link_data)

    # ترتيب الروابط: الفيديو الكامل أولاً، ثم الصوت، ثم الفيديو الصامت
    result['links'].sort(key=lambda x: (
        0 if x['type'] == 'video_with_audio' else 
        1 if x['type'] == 'audio_only' else 2
    ))

    # إضافة ملاحظة مهمة للمستخدم في الـ JSON
    result['note'] = "Important: YouTube links are tied to the IP address. These links might not open on your device if you are not using the same network as the server."

    return jsonify(result)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
