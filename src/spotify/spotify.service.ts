import { Injectable } from "@nestjs/common";
import axios, { AxiosResponse } from "axios";

@Injectable()
export class SpotifyService {
  private readonly clientId = "YOUR_CLIENT_ID";
  private readonly clientSecret = "YOUR_CLIENT_SECRET";
  private readonly redirectUri = "YOUR_REDIRECT_URI";
  private readonly base64EncodedCredentials = Buffer.from(
    `${this.clientId}:${this.clientSecret}`
  ).toString("base64");
  private accessToken: string;

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
