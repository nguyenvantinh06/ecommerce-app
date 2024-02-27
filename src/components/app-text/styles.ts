import {getSize} from 'src/hooks/use-resize-hoc';
import FONT_CONST from './app-font';
const {FONT_FAMILY} = FONT_CONST;

export function mapPropsToFontStyle(props: any) {
  let fontWeight = '';
  // let fontSize = 14;
  if (props && props.style && typeof props.style === 'object') {
    fontWeight = '';
    let iFontWeight = '';
    if (Array.isArray(props.style)) {
      for (let i of props.style) {
        if (i && i.fontWeight) {
          iFontWeight = i.fontWeight;
        }
        // if (i && i.fontSize && Number(i.fontSize)) {
        //   fontSize = i.fontSize;
        // }
      }
    } else {
      if (props.style.fontWeight) {
        iFontWeight = props.style.fontWeight;
      }
      // if (props.style.fontSize && Number(props.style.fontSize)) {
      //   fontSize = props.style.fontSize;
      // }
    }
    if (Number(iFontWeight)) {
      if (Number(iFontWeight) < 400) {
        fontWeight = 'light';
      } else if (Number(iFontWeight) === 400) {
        fontWeight = 'regular';
      } else if (Number(iFontWeight) === 500) {
        fontWeight = 'medium';
      } else if (Number(iFontWeight) >= 600) {
        fontWeight = 'bold';
      } else {
        fontWeight = '';
      }
    }
  }

  const familyDefault = 'regular';
  const newProps = {
    fontFamily: !fontWeight
      ? FONT_FAMILY[`${familyDefault.toUpperCase()}`]
      : FONT_FAMILY[`${fontWeight.toUpperCase()}`],
    // fontSize: getSize.m(fontSize),
  };

  return newProps;
}
