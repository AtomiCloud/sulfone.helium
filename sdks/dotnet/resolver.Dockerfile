FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:5553

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["sulfone-helium-resolver-api/sulfone-helium-resolver-api.csproj", "sulfone-helium-resolver-api/"]
COPY ["sulfone-helium/sulfone-helium.csproj", "sulfone-helium/"]
RUN dotnet restore "sulfone-helium/sulfone-helium.csproj" && dotnet restore "sulfone-helium-resolver-api/sulfone-helium-resolver-api.csproj"
COPY . .
RUN dotnet build "sulfone-helium-resolver-api/sulfone-helium-resolver-api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "sulfone-helium-resolver-api/sulfone-helium-resolver-api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "sulfone-helium-resolver-api.dll"]
