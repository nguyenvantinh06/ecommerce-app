import {SVG_NAME} from 'src/config/svg-path';
import {withIconResizeHOC} from 'src/hooks/use-resize-hoc';
import NOT_FOUND_COURSES from 'src/assets/svg/not_found_course.svg';

const AppIcons = {
  NO_INTERNET_CONNECTION_DARK: withIconResizeHOC(
    SVG_NAME.NO_INTERNET_CONNECTION_DARK,
    {
      s: 192,
    },
  ),
  NO_INTERNET_CONNECTION: withIconResizeHOC(SVG_NAME.NO_INTERNET_CONNECTION, {
    s: 192,
  }),
  ROAD_BLOCK: withIconResizeHOC(SVG_NAME.ROAD_BLOCK, {s: 128}),
  HOME: withIconResizeHOC(SVG_NAME.HOME, {
    s: 24,
  }),
  HOME_ACTIVE: withIconResizeHOC(SVG_NAME.HOME_ACTIVE, {
    s: 24,
  }),
  CHECK_CIRCLE: withIconResizeHOC(SVG_NAME.CHECK_CIRCLE, {
    s: 24,
  }),
  CHECK_CIRCLE_ACTIVE: withIconResizeHOC(SVG_NAME.CHECK_CIRCLE_ACTIVE, {
    s: 24,
  }),
  COLLECTION: withIconResizeHOC(SVG_NAME.COLLECTION, {
    s: 24,
  }),
  COLLECTION_ACTIVE: withIconResizeHOC(SVG_NAME.COLLECTION_ACTIVE, {
    s: 24,
  }),
  QUESTION_MARK_CIRCLE: withIconResizeHOC(SVG_NAME.QUESTION_MARK_CIRCLE, {
    s: 24,
  }),
  QUESTION_MARK_CIRCLE_ACTIVE: withIconResizeHOC(
    SVG_NAME.QUESTION_MARK_CIRCLE_ACTIVE,
    {
      s: 24,
    },
  ),
  USER: withIconResizeHOC(SVG_NAME.USER, {
    s: 24,
  }),
  USER_ACTIVE: withIconResizeHOC(SVG_NAME.USER_ACTIVE, {
    s: 24,
  }),
  CAMERA: withIconResizeHOC(SVG_NAME.CAMERA, {
    s: 18,
  }),
  DOCUMENT_TEXT: withIconResizeHOC(SVG_NAME.DOCUMENT_TEXT, {
    s: 18,
  }),
  SHARE: withIconResizeHOC(SVG_NAME.SHARE, {
    s: 24,
  }),
  PDF: withIconResizeHOC(SVG_NAME.PDF, {
    s: 18,
  }),
  EDIT_PROFILE: withIconResizeHOC(SVG_NAME.EDIT_PROFILE, {
    s: 20,
  }),
  USER_PROFILE: withIconResizeHOC(SVG_NAME.USER_PROFILE, {
    s: 16,
  }),
  PHONE_PROFILE: withIconResizeHOC(SVG_NAME.PHONE_PROFILE, {
    s: 16,
  }),
  MAIL_PROFILE: withIconResizeHOC(SVG_NAME.MAIL_PROFILE, {
    s: 16,
  }),
  NOT_FOUND_COURSES: withIconResizeHOC(SVG_NAME.NOT_FOUND_COURSES, {
    w: 621 / 2,
    h: 323 / 2,
  }),
};

export default AppIcons;
