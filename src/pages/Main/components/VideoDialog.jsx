import {Dialog} from 'primereact/dialog';
import styled from 'styled-components';

import {useStore} from 'state/store';
import VimeoPlayer from './VimeoPlayer';

export default function VideoDialog() {
  const videoVisible = useStore(state => state.videoVisible);
  const setVideoVisible = useStore(state => state.setVideoVisible);

  return (
    <StyledDialog
      header="Video"
      visible={videoVisible}
      onHide={() => {
        if (!videoVisible) return;
        setVideoVisible(false);
      }}
    >
      <VimeoPlayer
        videoUrl="https://vimeo.com/1045838701"
        width="100%"
        height="100%"
      />
    </StyledDialog>
  );
}

const StyledDialog = styled(Dialog)`
  min-width: 600px;
  width: 60vw;
  max-width: 1200px;
  min-height: 400px;
  height: 60vh;
  max-height: 700px;
  .p-dialog-content {
    padding: 1em;
    display: flex;
    justify-content: center;
    background-color: #252525;
  }
`;
