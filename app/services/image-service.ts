import Replicate from 'replicate';
import { ImageSource } from '@nativescript/core';

export class ImageService {
    private replicate: Replicate;

    constructor() {
        this.replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });
    }

    async enhanceBackground(imageSource: ImageSource): Promise<string> {
        const base64Image = imageSource.toBase64String('jpg');
        
        const output = await this.replicate.run(
            "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
            {
                input: {
                    image: `data:image/jpeg;base64,${base64Image}`,
                    prompt: "enhance the background, make it more interesting and artistic",
                    num_inference_steps: 50
                }
            }
        );
        
        return output[0];
    }

    async generateAvatar(imageSource: ImageSource): Promise<string> {
        const base64Image = imageSource.toBase64String('jpg');
        
        const output = await this.replicate.run(
            "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
            {
                input: {
                    image: `data:image/jpeg;base64,${base64Image}`,
                    prompt: "transform into an artistic avatar, maintain facial features, stylized digital art",
                    num_inference_steps: 50
                }
            }
        );
        
        return output[0];
    }
}