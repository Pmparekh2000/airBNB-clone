import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { Plugins, Capacitor, CameraSource, CameraResultType } from '@capacitor/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @ViewChild('filePicker') filePicker: ElementRef<HTMLInputElement>;
  @Output() imagePick = new EventEmitter<string | File>();
  @Input() showPreview = false;
  selectedImage: string;
  usePicker = false;

  constructor(private platformService: Platform) { }

  ngOnInit() {
    console.log('Mobile', this.platformService.is('mobile'));
    console.log('Hybrid', this.platformService.is('hybrid'));
    console.log('IOs', this.platformService.is('ios'));
    console.log('Android', this.platformService.is('android'));
    console.log('Desktop', this.platformService.is('desktop'));
    if ((this.platformService.is('mobile') && !this.platformService.is('hybrid')) || this.platformService.is('desktop')){
      this.usePicker = true;
    }
  }

  onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera')){
      this.filePicker.nativeElement.click();
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      // Giving the user to either use the gallary or the camera
      correctOrientation: true,
      height: 320,
      width: 200,
      // resultType: CameraResultType.Base64;
      resultType: CameraResultType.DataUrl
      // Base64 means that we are converting the image to a string
    }).then(image => {
      // this.selectedImage = image.base64String;
      // this.imagePick.emit(image.base64String);
      this.selectedImage = image.dataUrl;
      this.imagePick.emit(image.dataUrl);
    }).catch(error => {
      console.log(error);
      if (this.usePicker){
        this.filePicker.nativeElement.click()
      }
      return;
    });
  }

  onFileChosen(event: Event){
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile){
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
      this.imagePick.emit(pickedFile);
    };
    fr.readAsDataURL(pickedFile);
  }
}
