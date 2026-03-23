FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["sulfone-helium-template-api/sulfone-helium-template-api.csproj", "sulfone-helium-template-api/"]
RUN dotnet restore "sulfone-helium-template-api/sulfone-helium-template-api.csproj"
COPY . .
# Override Program.cs with test version (returns empty Cyan to avoid processor dependency)
COPY template/test-Program.cs sulfone-helium-template-api/Program.cs
WORKDIR "/src/sulfone-helium-template-api"
RUN dotnet build "sulfone-helium-template-api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "sulfone-helium-template-api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
LABEL cyanprint.dev=true
ENV ASPNETCORE_URLS=http://+:5550
WORKDIR /app
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser
COPY --from=publish /app/publish .
EXPOSE 5550
ENTRYPOINT ["dotnet", "sulfone-helium-template-api.dll"]
