# 첫 이미지에 /app/target 폴더에 빌드된 jar파일 생성
From gradle:2.7.16-openjdk-11 AS build
WORKDIR /app
COPY build.gradle ./
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn package -DskipTests

FROM openjdk:11-jre-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]