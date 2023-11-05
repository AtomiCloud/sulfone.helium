FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["sulfone-helium-processor-api/sulfone-helium-processor-api.csproj", "sulfone-helium-processor-api/"]
RUN dotnet restore "sulfone-helium-processor-api/sulfone-helium-processor-api.csproj"
COPY . .
WORKDIR "/src/sulfone-helium-processor-api"
RUN dotnet build "sulfone-helium-processor-api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "sulfone-helium-processor-api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
LABEL cyanprint.dev=true
ENV ASPNETCORE_URLS=http://+:5551
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "sulfone-helium-processor-api.dll"]
