import React from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

interface SocialShareButtonsProps {
  url: string;
  title: string;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ url, title }) => {
  const iconSize = 32;
  const iconStyle = { borderRadius: '50%', margin: '0 0.5rem' };

  return (
    <div className="social-share-buttons flex justify-center items-center my-8">
      <span className="mr-4 text-[var(--text-secondary)]">Compartilhar:</span>
      <LinkedinShareButton url={url} title={title}>
        <LinkedinIcon size={iconSize} style={iconStyle} />
      </LinkedinShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={iconSize} style={iconStyle} />
      </TwitterShareButton>
      <WhatsappShareButton url={url} title={title} separator=":: ">
        <WhatsappIcon size={iconSize} style={iconStyle} />
      </WhatsappShareButton>
      <FacebookShareButton url={url} title={title}>
        <FacebookIcon size={iconSize} style={iconStyle} />
      </FacebookShareButton>
    </div>
  );
};

export default SocialShareButtons;
