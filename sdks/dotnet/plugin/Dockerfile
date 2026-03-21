FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["sulfone-helium-plugin-api/sulfone-helium-plugin-api.csproj", "sulfone-helium-plugin-api/"]
RUN dotnet restore "sulfone-helium-plugin-api/sulfone-helium-plugin-api.csproj"
COPY . .
WORKDIR "/src/sulfone-helium-plugin-api"
RUN dotnet build "sulfone-helium-plugin-api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "sulfone-helium-plugin-api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
LABEL cyanprint.dev=true
ENV ASPNETCORE_URLS=http://+:5552
WORKDIR /app
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser
COPY --from=publish /app/publish .
EXPOSE 5552
ENTRYPOINT ["dotnet", "sulfone-helium-plugin-api.dll"]
