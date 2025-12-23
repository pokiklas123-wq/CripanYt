# استخدام صورة Owncast الرسمية
FROM owncast/owncast:latest

# المنفذ الذي يستمع عليه Owncast (للوحة الإدارة والمشاهدة)
EXPOSE 8080 1935

# أمر التشغيل الافتراضي مضمن في الصورة
CMD ["/app/owncast"]
