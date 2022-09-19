# https://developers.home-assistant.io/docs/add-ons/configuration#add-on-dockerfile
ARG BUILD_FROM
FROM $BUILD_FROM
ENV LANG C.UTF-8

RUN apk add --update --no-cache nodejs npm

# Execute during the build of the image
ARG TEMPIO_VERSION BUILD_ARCH
RUN \
    curl -sSLf -o /usr/bin/tempio \
    "https://github.com/home-assistant/tempio/releases/download/${TEMPIO_VERSION}/tempio_${BUILD_ARCH}"

# Copy root filesystem
COPY rootfs /
COPY code/package.json /src/
COPY code/package-lock.json /src/
WORKDIR /src/
RUN npm install
COPY code/src /src/src
COPY code/tsconfig.json /src/


