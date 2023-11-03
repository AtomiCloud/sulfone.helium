FROM mcr.microsoft.com/dotnet/runtime:8.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["sulfone-helium-processor-console/sulfone-helium-processor-console.csproj", "sulfone-helium-processor-console/"]
RUN dotnet restore "sulfone-helium-processor-console/sulfone-helium-processor-console.csproj"
COPY . .
WORKDIR "/src/sulfone-helium-processor-console"
RUN dotnet build "sulfone-helium-processor-console.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "sulfone-helium-processor-console.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "sulfone-helium-processor-console.dll"]
