import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Alarm from '@material-ui/icons/Alarm';
import AccountBalance from '@material-ui/icons/AccountBalance';
import AccountBox from '@material-ui/icons/AccountBox';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Add from '@material-ui/icons/Add';
import AttachMoney from '@material-ui/icons/AttachMoney';
import Block from '@material-ui/icons/Block';
import Build from '@material-ui/icons/Build';
import Business from '@material-ui/icons/Business';
import CardGiftcard from '@material-ui/icons/CardGiftcard';
import Close from '@material-ui/icons/Close';
import CropFree from '@material-ui/icons/CropFree';
import Crop from '@material-ui/icons/Crop';
import Check from '@material-ui/icons/Check';
import CloudUpload from '@material-ui/icons/CloudUpload';
import CreditCard from '@material-ui/icons/CreditCard';
import Delete from '@material-ui/icons/Delete';
import Description from '@material-ui/icons/Description';
import Devices from '@material-ui/icons/Devices';
import Event from '@material-ui/icons/Event';
import Edit from '@material-ui/icons/Edit';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Flag from '@material-ui/icons/Flag';
import Face from '@material-ui/icons/Face';
import Gavel from '@material-ui/icons/Gavel';
import HeadsetMic from '@material-ui/icons/HeadsetMic';
import Help from '@material-ui/icons/Help';
import HourglassEmpty from '@material-ui/icons/HourglassEmpty';
import Home from '@material-ui/icons/Home';
import InsertChartOutlined from '@material-ui/icons/InsertChartOutlined';
import LockOpen from '@material-ui/icons/LockOpen';
import Language from '@material-ui/icons/Language';
import Menu from '@material-ui/icons/Menu';
import PanTool from '@material-ui/icons/PanTool';
import Place from '@material-ui/icons/Place';
import Print from '@material-ui/icons/Print';
import People from '@material-ui/icons/People';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import Refresh from '@material-ui/icons/Refresh';
import Send from '@material-ui/icons/Send';
import Settings from '@material-ui/icons/Settings';
import SettingsBackupRestore from '@material-ui/icons/SettingsBackupRestore';
import SettingsPower from '@material-ui/icons/SettingsPower';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import TouchApp from '@material-ui/icons/TouchApp';
import Visibility from '@material-ui/icons/Visibility';
import VpnKey from '@material-ui/icons/VpnKey';
import ZoomIn from '@material-ui/icons/ZoomIn';

export default {
    welcome: {
        global: Language,
        fast: Alarm,
        cheap: AttachMoney,
    },
    objects: {
        activity: SwapHoriz,
        check: Check,
        country: Language,
        contact: AccountCircle,
        charge: AccountBalance,
        dispute: Gavel,
        hand: PanTool,
        key: VpnKey,
        menu: Menu,
        page: Description,
        payment: AttachMoney,
        report: InsertChartOutlined,
        selected: RadioButtonChecked,
        topup: Send,
        unselected: RadioButtonUnchecked,
        session: Devices,
        user: AccountBox,
        card: CreditCard,
        reseller: {
            user: AccountBox,
            topup: Send,
            agent: HeadsetMic
        }
    },
    menu: {
        admin: Settings,
        contacts: People,
        countries: Flag,
        help: Help,
        home: Home,
        metadatas: Crop,
        options: Build,
        providers: Business,
        promotions: CardGiftcard,
        topups: Send,
        users: AccountBox,
        fraud: Visibility,
        resellers: Business,
    },
    actions: {
        add: Add,
        back: ArrowBack,
        block: Block,
        forward: ArrowForward,
        close: Close,
        collapse: ExpandLess,
        copy: CropFree,
        delete: Delete,
        details: ZoomIn,
        edit: Edit,
        expand: ExpandMore,
        join: TouchApp,
        login: LockOpen,
        logout: SettingsPower,
        ok: Check,
        print: Print,
        refund: SettingsBackupRestore,
        retry: Refresh,
        search: ZoomIn,
        topup: Send,
        upload: CloudUpload
    },
    card: {
        number: CreditCard,
        name: Face,
        expiry: Event,
        cvc: VpnKey,
        zip: Place,
    },
    topup: {
        steps: {
            delay: HourglassEmpty,
            transfer: {
                success: Check,
                exception: ErrorOutline
            },
            refund: SettingsBackupRestore
        }
    },
};
