from flask import Flask, jsonify, request
import os

app = Flask(__name__)

@app.route('/')
def home():
    return "🎯 YouTube Bot - استخدم /get_links?url=رابط_اليوتيوب"

@app.route('/get_links', methods=['GET'])
def get_links():
    url = request.args.get('url')
    
    if not url:
        return jsonify({'error': 'أرسل رابط اليوتيوب'})
    
    return jsonify({
        'status': 'success',
        'received_url': url,
        'message': 'تم استلام الرابط بنجاح',
        'next_steps': [
            '1. يوتيوب تمنع السيرفرات السحابية',
            '2. استخدم yt-dlp محلياً في Termux',
            '3. أو استخدم مواقع تحميل مثل y2mate.guru'
        ]
    })

@app.route('/health')
def health():
    return jsonify({'status': 'active', 'timestamp': '2024'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
