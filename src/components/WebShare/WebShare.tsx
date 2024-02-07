import { RWebShare } from 'react-web-share';
import { formatLatinNameDb } from '../../utils/app.utils';
import './WebShare.scss';
import { CLIENT_URL } from '../../utils/app.constants';

interface WebShareProps {
  name: string;
  latinName: string;
}

const WebShare = ({ name, latinName }: WebShareProps) => {
  return (
    <RWebShare
      data={{
        text: 'Plantify',
        url: `${CLIENT_URL}${formatLatinNameDb(latinName)}`,
        title: `Share - ${name}`,
      }}
      sites={['facebook', 'whatsapp', 'mail', 'copy']}
    >
      <button>Share</button>
    </RWebShare>
  );
};

export default WebShare;
