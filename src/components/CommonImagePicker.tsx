import React, { PureComponent } from 'react';
import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';

// see the https://github.com/ivpusic/react-native-image-crop-picker

const defaultOptions = {
  mediaType: 'photo', // Accepted mediaType for image selection, can be one of: 'photo', 'video', or 'any'
  compressImageQuality: 0.8, // Compress image with quality (from 0 to 1, where 1 is best quality)
  compressImageMaxWidth: 1024, // Compress image with maximum width
  compressImageMaxHeight: 768, // Compress image with maximum height
  cropping: false, // Enable or disable cropping
  cropperCircleOverlay: false, // Enable or disable circular cropping mask.
  width: 300, // Width of result image when used with cropping option
  height: 400, // Height of result image when used with cropping option
  multiple: false, // Enable or disable multiple image selection
  includeBase64: false, // Enable or disable returning base64 data with image
};

const iosOptions = {
  ...defaultOptions,
  maxFiles: 9, // Max number of files to select when using multiple option
  useFrontCamera: false, // Whether to default to the front/'selfie' camera when opened
  loadingLabelText: 'loading...',
};

const androidOptions = {
  ...defaultOptions,
};

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

interface State {
  enthusiasmLevel: number;
}

class CommonImagePicker extends PureComponent<Props, State> {
  public static defaultProps = {};
  public ActionSheet: any;
  private _takePhotoCB: Function;
  private _takePhotoOP: any;

  public constructor(props: Props) {
    super(props);
    this._takePhotoCB = Function;
    this._takePhotoOP = {};
  }

  public takePhoto(callback: any, options = {}) {
    const _Options = {
      ...(Platform.OS === 'ios' ? iosOptions : androidOptions),
      ...options,
    };
    this._takePhotoCB = callback;
    this._takePhotoOP = _Options;
    console.info('ImagePicker.options', _Options);
    this.ActionSheet.show();
  }

  /**
   * Response Object
   * Property	Type	Description
   * path	string	Selected image location
   * width	number	Selected image width
   * height	number	Selected image height
   * mime	string	Selected image MIME type (image/jpeg, image/png)
   * size	number	Selected image size in bytes
   * data	base64	Optional base64 selected file representation
   */
  private _openPicker() {
    ImagePicker.openPicker(this._takePhotoOP).then(image => {
      this._takePhotoCB(image);
    });
  }

  private _openCamera() {
    const { multiple } = this._takePhotoOP;
    this._takePhotoOP.multiple = false; // android 
    ImagePicker.openCamera(this._takePhotoOP).then(image => {
      if (multiple) {
        this._takePhotoCB([image]);
      } else {
        this._takePhotoCB(image);
      }
    });
  }

  private _openCropper(options = {}) {
    const _Options = {
      path: '',
      width: 300,
      height: 400,
      ...options,
    };
    ImagePicker.openCropper(_Options).then(image => {
      console.log('openCropper', image);
    });
  }

  private _handleActionSheet(index: number) {
    if (index === 1) {
      // gallery picker
      this._openPicker();
    } else if (index === 2) {
      // open camera
      this._openCamera();
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public render() {
    return (
      <ActionSheet
        ref={o => {
          this.ActionSheet = o;
        }}
        options={['Cancel','Select from phone album','Take a photo']}
        cancelButtonIndex={0}
        onPress={this._handleActionSheet.bind(this)}
      />
    );
  }
}

export default CommonImagePicker;
