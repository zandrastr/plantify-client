import { RWebShare } from 'react-web-share';
import { formatLatinNameDb } from '../utils/app.utils';

interface WebShareProps {
  name: string;
  latinName: string;
}

const WebShare = ({ name, latinName }: WebShareProps) => {
  return (
    <RWebShare
      data={{
        text: 'Plantify',
        url: `http://localhost:5173/plant/${formatLatinNameDb(latinName)}`,
        title: `Share - ${name}`,
      }}
      sites={['facebook', 'whatsapp', 'mail', 'copy']}
      disableNative={true} //Disable browsers native share functionality
    >
      <button>Share</button>
    </RWebShare>
  );
};

export default WebShare;
