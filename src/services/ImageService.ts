import Replicate from 'replicate';

export class ImageService {
    private replicate: Replicate;

    constructor() {
        this.replicate = new Replicate({
            auth: import.meta.env.VITE_REPLICATE_API_TOKEN,
        });
    }

    async enhanceBackground(imageFile: File): Promise<string> {
        const base64Image = await this.fileToBase64(imageFile);
        
        const output = await this.replicate.run(
            "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
            {
                input: {
                    image: base64Image,
                    prompt: "enhance the background, make it more interesting and artistic",
                    num_inference_steps: 50
                }
            }
        );
        
        return output[0];
    }

    async generateAvatar(imageFile: File): Promise<string> {
        const base64Image = await this.fileToBase64(imageFile);
        
        const output = await this.replicate.run(
            "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
            {
                input: {
                    image: base64Image,
                    prompt: "transform into an artistic avatar, maintain facial features, stylized digital art",
                    num_inference_steps: 50
                }
            }
        );
        
        return output[0];
    }

    private fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }
}