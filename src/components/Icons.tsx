import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Camera,
  ChevronDown,
  Globe,
  Menu,
  Play,
  ShieldCheck,
  UserCircle2,
  X,
} from 'lucide-react';

export const ArrowForwardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <ArrowRight className={className} aria-hidden="true" />
);

export const ArrowBackIcon: React.FC<{ className?: string }> = ({ className }) => (
  <ArrowLeft className={className} aria-hidden="true" />
);

export const AccountCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <UserCircle2 className={className} aria-hidden="true" />
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <ChevronDown className={className} aria-hidden="true" />
);

export const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Menu className={className} aria-hidden="true" />
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <X className={className} aria-hidden="true" />
);

export const ShieldCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <ShieldCheck className={className} aria-hidden="true" />
);

export const SocialCameraIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Camera className={className} aria-hidden="true" />
);

export const SocialPlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Play className={className} aria-hidden="true" />
);

export const SocialGlobeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Globe className={className} aria-hidden="true" />
);

export const SocialBookmarkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Bookmark className={className} aria-hidden="true" />
);
