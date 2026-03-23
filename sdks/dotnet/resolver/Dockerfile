FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["sulfone-helium-resolver-api/sulfone-helium-resolver-api.csproj", "sulfone-helium-resolver-api/"]
RUN dotnet restore "sulfone-helium-resolver-api/sulfone-helium-resolver-api.csproj"
COPY . .
WORKDIR "/src/sulfone-helium-resolver-api"
RUN dotnet build "sulfone-helium-resolver-api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "sulfone-helium-resolver-api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
LABEL cyanprint.dev=true
ENV ASPNETCORE_URLS=http://+:5553
WORKDIR /app
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser
COPY --from=publish /app/publish .
EXPOSE 5553
ENTRYPOINT ["dotnet", "sulfone-helium-resolver-api.dll"]
