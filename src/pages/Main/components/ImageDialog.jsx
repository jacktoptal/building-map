import {Dialog} from 'primereact/dialog';
import styled from 'styled-components';

import {useStore} from 'state/store';
import ImageGalleryViewer from './ImageGalleryViewer';

export default function ImageDialog() {
  const imageVisible = useStore(state => state.imageVisible);
  const setImageVisible = useStore(state => state.setImageVisible);

  return (
    <StyledDialog
      header="Image"
      visible={imageVisible}
      onHide={() => {
        if (!imageVisible) return;
        setImageVisible(false);
      }}
    >
      <ImageGalleryViewer />
    </StyledDialog>
  );
}

const StyledDialog = styled(Dialog)`
  min-width: 600px;
  width: 80vw;
  max-width: 1400px;
  height: fit-content;
  .p-dialog-content {
    padding: 1em;
    background-color: #252525;
    height: fit-content;
    overflow: hidden;
  }
`;
