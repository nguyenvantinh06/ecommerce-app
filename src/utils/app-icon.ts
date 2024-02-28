import {SvgName} from 'src/config/svg-path';
import {withIconResizeHOC} from 'src/hooks/use-resize-hoc';

const AppIcons = {
  NoInternetConnectionDark: withIconResizeHOC(
    SvgName.NoInternetConnectionDark,
    {
      s: 192,
    },
  ),
  NoInternetConnection: withIconResizeHOC(SvgName.NoInternetConnection, {
    s: 192,
  }),
  RoadBlock: withIconResizeHOC(SvgName.RoadBlock, {s: 128}),
  Home: withIconResizeHOC(SvgName.Home, {
    s: 24,
  }),
  HomeActive: withIconResizeHOC(SvgName.HomeActive, {
    s: 24,
  }),
  CheckCircle: withIconResizeHOC(SvgName.CheckCircle, {
    s: 24,
  }),
  CheckCircleActive: withIconResizeHOC(SvgName.CheckCircleActive, {
    s: 24,
  }),
  Collection: withIconResizeHOC(SvgName.Collection, {
    s: 24,
  }),
  CollectionActive: withIconResizeHOC(SvgName.CollectionActive, {
    s: 24,
  }),
  QuestionMarkCircle: withIconResizeHOC(SvgName.QuestionMarkCircle, {
    s: 24,
  }),
  QuestionMarkCircleActive: withIconResizeHOC(
    SvgName.QuestionMarkCircleActive,
    {
      s: 24,
    },
  ),
  User: withIconResizeHOC(SvgName.User, {
    s: 24,
  }),
  UserActive: withIconResizeHOC(SvgName.UserActive, {
    s: 24,
  }),
  Camera: withIconResizeHOC(SvgName.Camera, {
    s: 18,
  }),
  DocumentText: withIconResizeHOC(SvgName.DocumentText, {
    s: 18,
  }),
  Share: withIconResizeHOC(SvgName.Share, {
    s: 24,
  }),
  Pdf: withIconResizeHOC(SvgName.Pdf, {
    s: 18,
  }),
  EditProfile: withIconResizeHOC(SvgName.EditProfile, {
    s: 20,
  }),
  UserProfile: withIconResizeHOC(SvgName.UserProfile, {
    s: 16,
  }),
  PhoneProfile: withIconResizeHOC(SvgName.PhoneProfile, {
    s: 16,
  }),
  MailProfile: withIconResizeHOC(SvgName.MailProfile, {
    s: 16,
  }),
};

export default AppIcons;
