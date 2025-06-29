FROM python:3.12-slim
# Install system dependencies for mysqlclient
RUN apt-get update && apt-get install -y \
    gcc \
    pkg-config \
    default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .
RUN chmod +x ./entrypoint.sh

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 8080
#add execution priveleges before trying
ENTRYPOINT ["./entrypoint.sh"]
