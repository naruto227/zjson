import { Configs, FmtStatus, FmterEles } from './formatter/formatter.conf';
import { Formatter } from './formatter/formatter.main';

export class Zjson {
  conf: Configs;
  lang: string;
  version: string;
  updateTime: string;
  isOnLeft: boolean = true;
  isOnInit: boolean = true;
  isPageActive: boolean = true;
  isWindowBig: boolean;
  sourcest: string = '';
  formated: string = '';
  alertMsg: string = '';
  saveFmtTime: string;
  fmtSourcest: string;
  fmtHists: any[] = [];
  maxSrcSize: any = null;
  maxFmtSize: any = null;
  isSrcMax: boolean = false;
  isFmtMax: boolean = false;
  noticeCtrl: string = 'hide';
  noticeMsg: string = '';
  noticeType: 'success'|'danger'|null = null;
  isModelExpand: boolean = false;
  isFmtedEditAb: boolean = true;
  isShowConfigs: boolean = false;
  isConfOnSlid: boolean = false;
  isOriginEmpty: boolean = true;
  toggleConfTiele: string;
  theme: string;
  altMsgs: any = {};
  eles: FmterEles = new FmterEles();
  fmtSt: FmtStatus = new FmtStatus();
  formatter: Formatter = new Formatter();
  alertInfo: any = {type: '', idx: NaN, brc: ''};
  alertType: 'info'|'success'|'warning'|'danger' = 'info';
  greeting: string;
  themes: any[] = [
    'dark', 'abyss', 'blue', 'red', 'kimbie',
    'moonlight', 'solarized', 'light'
  ];
  languages: any = {
    en: {long: 'English', short: 'EN'},
    zh: {long: '中文（简体）', short: '中文'}
  };
  i18n: any = {
    confs: {show: '', hide: ''},
    model: {expand: '', combine: ''},
    type:  {json: 'Json', jsObj: 'JsObj'},
    alert: {ost: '', col: '', val: '', end: '', war: '', scc: ''}
  };
  getTimeStr = () => fn.fmtDate('MM-dd hh:mm:ss');
  setRowIdxWpHeight = () => $('.z-canvas').height() + 12 + 'px';
}
