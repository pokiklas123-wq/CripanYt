# محتوى Dockerfile المقترح للنسخة المجتمعية
FROM ubuntu:18.04
ARG AntMediaServer=ant-media-server-community-2.14.0.zip
RUN apt-get update && apt-get install -y curl libcap2 wget net-tools openjdk-8-jdk
ADD ./${AntMediaServer} /home
RUN cd home \
    && wget https://raw.githubusercontent.com/ant-media/Scripts/master/install_ant-media-server.sh \
    && chmod 755 install_ant-media-server.sh
RUN cd home \
    && ./install_ant-media-server.sh -i ${AntMediaServer} -s false
RUN update-java-alternatives -s java-1.8.0-openjdk-amd64
EXPOSE 5080 5443 1935
CMD ["/usr/local/antmedia/start.sh"]
