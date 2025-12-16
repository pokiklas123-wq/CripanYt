FROM antmedia/antmedia-server:latest
EXPOSE 5080 5443 1935
CMD ["/usr/local/antmedia/start.sh"]
