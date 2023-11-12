import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios, { AxiosResponse } from "axios";

@Injectable()
export class SpotifyService {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUri: string;
  private readonly base64EncodedCredentials: string;
  private accessToken: string;

  constructor(private configService: ConfigService) {
    this.clientId = this.configService.get<string>("SPOTIFY_CLIENT_ID");
    this.clientSecret = this.configService.get<string>("SPOTIFY_CLIENT_SECRET");
    this.redirectUri = this.configService.get<string>("SPOTIFY_REDIRECT_URI");
    this.base64EncodedCredentials = Buffer.from(
      `${this.clientId}:${this.clientSecret}`
    ).toString("base64");
  }

  async getAccessToken(code: string): Promise<void> {
    const authResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: this.redirectUri,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${this.base64EncodedCredentials}`,
        },
      }
    );

    this.accessToken = authResponse.data.access_token;
  }

  async getTopTracks(): Promise<AxiosResponse> {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks",
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }
    );
    return response;
  }
}
