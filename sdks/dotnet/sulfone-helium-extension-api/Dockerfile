FROM mcr.microsoft.com/dotnet/runtime:8.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["sulfone-helium-extension-api/sulfone-helium-extension-api.csproj", "sulfone-helium-extension-api/"]
RUN dotnet restore "sulfone-helium-extension-api/sulfone-helium-extension-api.csproj"
COPY . .
WORKDIR "/src/sulfone-helium-extension-api"
RUN dotnet build "sulfone-helium-extension-api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "sulfone-helium-extension-api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "sulfone-helium-extension-api.dll"]
