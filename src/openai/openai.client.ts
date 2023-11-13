import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";

@Injectable()
export class OpenAiService {
  private readonly openai;
  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>("OPENAI_SECRET_KEY"),
    });
  }
  async generateText(prompt: string): Promise<string> {
    try {
      const response = await this.openai.createCompletion({
        engine: "gpt-3.5-turbo",
        prompt: prompt,
        max_tokens: 50,
      });
      return response.choices[0].text;
    } catch (error) {
      throw new Error(`Failed to generate text: ${error.message}`);
    }
  }
}
