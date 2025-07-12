import { Observable, ImageSource, knownFolders, path } from '@nativescript/core';
import { ImageService } from '../services/image-service';
import * as camera from '@nativescript/camera';
import * as imagepicker from '@nativescript/imagepicker';

export class MainViewModel extends Observable {
    private imageService: ImageService;
    private _originalImage: ImageSource;
    private _processedImage: ImageSource;
    private _isProcessing: boolean = false;

    constructor() {
        super();
        this.imageService = new ImageService();
    }

    get originalImage(): ImageSource {
        return this._originalImage;
    }

    set originalImage(value: ImageSource) {
        if (this._originalImage !== value) {
            this._originalImage = value;
            this.notifyPropertyChange('originalImage', value);
        }
    }

    get processedImage(): ImageSource {
        return this._processedImage;
    }

    set processedImage(value: ImageSource) {
        if (this._processedImage !== value) {
            this._processedImage = value;
            this.notifyPropertyChange('processedImage', value);
        }
    }

    get isProcessing(): boolean {
        return this._isProcessing;
    }

    set isProcessing(value: boolean) {
        if (this._isProcessing !== value) {
            this._isProcessing = value;
            this.notifyPropertyChange('isProcessing', value);
        }
    }

    async takePhoto() {
        try {
            const image = await camera.takePicture();
            this.originalImage = image;
        } catch (error) {
            console.error('Error taking photo:', error);
        }
    }

    async pickImage() {
        try {
            const context = imagepicker.create({
                mode: "single"
            });
            
            const selection = await context.present();
            if (selection.length > 0) {
                this.originalImage = await ImageSource.fromAsset(selection[0]);
            }
        } catch (error) {
            console.error('Error picking image:', error);
        }
    }

    async enhanceBackground() {
        if (!this.originalImage || this.isProcessing) return;
        
        try {
            this.isProcessing = true;
            const enhancedImageUrl = await this.imageService.enhanceBackground(this.originalImage);
            this.processedImage = await ImageSource.fromUrl(enhancedImageUrl);
        } catch (error) {
            console.error('Error enhancing background:', error);
        } finally {
            this.isProcessing = false;
        }
    }

    async generateAvatar() {
        if (!this.originalImage || this.isProcessing) return;
        
        try {
            this.isProcessing = true;
            const avatarImageUrl = await this.imageService.generateAvatar(this.originalImage);
            this.processedImage = await ImageSource.fromUrl(avatarImageUrl);
        } catch (error) {
            console.error('Error generating avatar:', error);
        } finally {
            this.isProcessing = false;
        }
    }
}