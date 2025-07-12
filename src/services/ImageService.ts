import Replicate from 'replicate';

export class ImageService {
    private replicate: Replicate;

    constructor() {
        // Initialize the Replicate client using the API token from environment variables
        this.replicate = new Replicate({
            auth: import.meta.env.VITE_REPLICATE_API_TOKEN,
        });
    }

    // Enhances the background of the input image using a predefined AI model
    async enhanceBackground(imageFile: File): Promise<string> {
        const base64Image = await this.fileToBase64(imageFile);

        // Call the Replicate model with a prompt to enhance the image background
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

        // Return the generated image URL
        return output[0];
    }

    // Generates an artistic avatar version of the input image
    async generateAvatar(imageFile: File): Promise<string> {
        const base64Image = await this.fileToBase64(imageFile);

        // Call the Replicate model with a prompt to stylize the image into an avatar
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

        // Return the generated avatar image URL
        return output[0];
    }

    // Converts an image File object to a Base64-encoded string
    private fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }
}
