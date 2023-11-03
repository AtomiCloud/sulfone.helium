FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["sulfone-helium/sulfone-helium.csproj", "sulfone-helium/"]
RUN dotnet restore "sulfone-helium/sulfone-helium.csproj"
COPY . .
WORKDIR "/src/sulfone-helium"
RUN dotnet build "sulfone-helium.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "sulfone-helium.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "sulfone-helium.dll"]
