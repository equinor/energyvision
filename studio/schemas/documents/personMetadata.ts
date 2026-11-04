import { CgMediaPodcast } from 'react-icons/cg';
import { FaBriefcase, FaUserTie } from 'react-icons/fa';
import { GiVideoConference } from 'react-icons/gi';
import { HiOutlineUserGroup } from 'react-icons/hi';

export const personMetadata = [
  { title: 'Media relations', value: 'media', icon: CgMediaPodcast },
  { title: 'Board director', value: 'boardDirector', icon: FaUserTie },
  { title: 'CEC', value: 'cec', icon: FaBriefcase },
  {
    title: 'Investor relations',
    value: 'investorRelations',
    icon: HiOutlineUserGroup,
  },
  {
    title: 'Autumn conference',
    value: 'autumnConference',
    icon: GiVideoConference,
  },
];
