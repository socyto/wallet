import { ReactElement } from 'react';
import { ViewProps, StyleProp } from 'react-native';

export interface ItemNotRegisteredProps {
    displayName: string,
    avatar: string,
    userId: string,
    isInvited: boolean,
    onOpenConversation(phone: string): void,
    onSendInviteMessage(phone: string, name: string): void,
}

export interface InviteListProps {
    data: Array<ItemNotRegisteredProps>,
    refreshing: boolean,
    shouldShowHeader: boolean,
    shouldEnableScroll: boolean,
    customStyle: StyleProp<ViewProps>,
    onViewAll(): void,
    onOpenConversation(phone: string): void,
    onSendInviteMessage(phone: string, name: string): void,
    onRefresh(): void
}

export interface ScreenProps {
    params: ParamsInterface,
    navigator: NavigatorInterface,
    navigation: NavigationInterface,
    route: any
}

export interface ListFriendHooksInterface {
    params: ParamsInterface,
    navigator: NavigatorInterface,
    chat: Object
}
export interface NavigatorInterface {
    setOptions: Function,
    pop: Function,
    showBottom?: Function,
    popToTop: Function,
    show: Function,
    navigation: NavigationInterface,
    dismiss?: Function,
    requestClose: Function,
    push: Function
}

export interface NavigationInterface {
    setOptions: Function,
    pop: Function,
    showBottom?: Function,
    popToTop: Function,
    show: Function,
    dismiss?: Function,
    navigate: Function
    navigation: NavigationProps,
    push: Function,
    goBack?: () => void,
    canGoBack?: () => boolean,
    isFocused: () => boolean,
    addListener?: (event: string, callback: Function) => void
}
export interface NavigationProps {
    canGoBack: Function,
    goBack: Function
}
export interface ParamsInterface {
    list: Array<UserInterface>,
    onUpdate: Function,
    chat: ChatProps,
    cashOutLimit?: CashOutLimitProps,
    autoInvestData?: {
        amount: number,
        frequency: string,
        startDate: number,
        isEdit: boolean,
        stateChanged: string,
        isCashAll: boolean
    },
    isRegisterAutoInvest?: boolean,
    autoInvest: AutoInvestProps,
    onUpdateHistoryAutoInvest?: Function,
    screen?: string,
    rank?: string,
    luckyWheel?: Object,
    socialFeedId?: number,
    isWhitelistRTVB: boolean
}

export interface UserInterface {
    avatar: string,
    displayName: string,
    userId: string,
    isInvited: boolean
}

export interface BottomSheetProps {
    child: ReactElement,
    isVisible: boolean,
    ratio: number,
    customStyle: StyleProp<ViewProps>
}

export interface ListFriendProps {
    props: ListFriendHooksInterface,
    params: ParamsInterface,
    navigator: NavigatorInterface,
    chat: Object
}
export interface FilterItem {
    title: Object,
    index: number,
    isSelected?: boolean
}
export interface ReferralItem {
    username: string,
    phone: string,
    current_step: number,
    next_message: string,
    message: string
}
export interface HistoryReferralListProps {
    data: Array<ReferralItem>,
    onRefresh(): void,
    refreshing: boolean
}
export interface NumbersHistoryReferral {
    completedCount: number
    isDoing: number
}
export interface HistoryReferralProps {
    props: ParamsProps,
    params: ParamsProps
}
export interface HistoryReferralInputProps {
    params: ParamsProps
}
export interface ParamsProps {
    history: HistoryProps,
    filters: Array<FilterItem>,
}
export interface CashOutLimitProps {
    maximumCashOut: string,
    minimumCashOut: string
}
export interface HistoryProps {
    title: TitleObject,
    imageHeader: string
}
export interface FilterProgressBarProps {
    filters: Array<FilterItem>,
    onChangeFilter: Function
}
export interface TitleObject {
    vi: String,
    en: String
}

export interface AvavtarProps {
    source: string,
    customStyle?: StyleProp<ViewProps>,
    isCache?: boolean
}

export interface ChatProps {
    metaData: MetaDataProps,
    templateData: TemplateData
}
export interface TemplateData {
    actionOnCard: ActionOnCardProps
}
export interface ActionOnCardProps {
    params: CardParams
}
export interface CardParams {
    referralCode: String
}
export interface MetaDataProps {
    trackingId: string,
    recipient: RecipientsProps
}
export interface RecipientsProps {
    partnerIds: Array<String>
}
export interface LandingPageProps {

}
export interface RefIdP2P {
    newFlow: String,
    oldFlow: String
}
export interface DatePickerProps {
    navigator: NavigatorInterface,
    mode?: string,
    onSelected: (date: string) => null,
    title: string,
    initialValue: number
}
export interface ItemHistoryInvestProps {
    item: AutoInvestHistoryItemProps,
    index: number
}
export interface AutoInvestHistoryItemProps {
    transId: string,
    resultCode: number,
    description?: string,
    createdTime: number,
    amount: number,
    balanceMoMo: number,
    balanceTTT: number,
    fee: number,
    transState: string,
    transType: string,
    bankName: string,
    title: string,
    streak: number,
    resultMessage: string
}
export type HistoryAutoInvestProps = ScreenProps & {
    params: {
        historyData: Array<AutoInvestHistoryItemProps>
    }
}
export interface InstructionsProps {
    navigator: NavigatorInterface,
    mode?: string
}
export interface AutoInvestBlockProps {
    value: string,
    onPress: Function,
    onPressContainer: Function
}
export interface AutoInvestProps {
    state: string,
    scheduleType: string,
    scheduleDate: string,
    currentTime: string,
    topupAmount: number,
    sofInfo: Array<SOFInfoItemProps>
}
export interface SOFInfoItemProps {
    moneySource: number,
    bankCode: string,
    detail: {
        minAmountTopup: number,
        amountForceOtp: number
    }
}

export interface RightHeaderProps {
    listService: Array<string>,
    onClose?: Function
}
export interface SourceOfFundProps {
    title: string,
    desc: string,
    arraySOF: Array<any>,
    navigator: NavigatorInterface,
    bodyInfo?: string,
    titleBottom: string,
}

export interface BankItemProps {
    order: number,
    bankName: string,
    bankCode: string,
    logo: string,
    shortBankName: string,
    displayName: string,
    whiteLists: Array<number>,
    available: boolean,
    isPopular: boolean
}
export interface CheckFeeResponseProps {
    resultMessage: string,
    resultCode: number,
    coreTransId: number,
    totalAmount: number,
    state: number
}
export type BankCardsProps = BankItemProps & {
    accId?: string,
    createDate?: string,
    fee?: number,
    moneySource: number,
    description?: string,
    bankDisplayName?: string
}
export interface LuckyWheelBannerProps {
    banner: string,
    ratioBanner: number,
    featureCode: string,
    turn: number
}
export interface PrimaryButtonProps {
    isDisabled?: boolean,
    onSubmit: () => {},
    title: string,
    haveTopBorder?: boolean,
    containerStyle: Object,
    titleStyle?: Object,
    image?: string,
    buttonStyle?: Object,
    imageStyle?: Object,
    isWhiteTemp?: boolean
}
export interface InviteFriendProps {
    faqs: Array<any>,
    list: Array<any>,
    sharing: Object,
    shareTitle: Object,
    isShowHistoryReferral: boolean,
    domain: string,
    rulesUrl: string,
    deepLinkTxt: Object,
    navigator: NavigatorInterface,
    navigation: NavigationType,
    universalParams: Object,
    history: Object,
    filters: Object,
    chat: Object,
    onTrackingActionEvent: () => {}
}
export interface YourGiftsProps {
    props: object,
    referralCode: string,
    screenRef: object,
    progress: Array<any>,
    currentStep: number,
    config: object,
    navigator: NavigatorInterface,
    onGetProgressAward: () => {},
    onTrackingActionEvent: () => {}
}
export interface InteractionPromises {
    cancel: Function
}
export interface MyPocketProps {

}
export interface DiscoveryProps {

}
export interface ItemListShortcutHome {
    title: string,
    icon: string,
    refId?: string,
    screenName?: string,
    stackName?: string,
    button_name?: string,
    type?: string,
    badgeLang?: object
}

export interface CheckStatusResponse {
    resultCode: number,
    resultMessage: string,
    data: DataCheckStatus
}
export interface DataCheckStatus {
    accumulatedInterest: number,
    availableBalance: number,
    cashoutLimitDay: number,
    cashoutLimitMonth: number,
    dayInterestNetRate: string,
    fastCashInRate: string,
    interestRate: number,
    investLevel: string,
    investStatus: number,
    maintenance: { active: boolean },
    normalCashInRate: string,
    totalBalance: number,
    firstCashin: boolean,
    interestToday: number
}

export interface WidgetProps {

}
export interface CyberConfigItem {
    icon: string,
    popupTitle: object,
    popupCTA: object,
    popupContent: object,
    refId: string
}

export interface PopupProps {
    requestClose: () => void,
    onCopyBankNumber?: () => void
}
export interface VirtualAccountProps {
    resultCode: number,
    resultMessage: string,
    accountName: string,
    accountNumber: string,
    bankName: string,
    qrCodeString: string,
    logo: string
}
export interface ERROR_MESSAGE_PROPS {
    dob: string,
    email: string,
    address: string,
    issuedDate: string,
    issuedPlace: string
}

export interface FORM_DATA_PROPS {
    fullname: string,
    dob: string,
    walletId: string,
    gender: number,
    nationalId: string,
    issuedPlace: string,
    issuedDate: string,
    email: string,
    address: string,
    walletStatus: string
}
export interface KycMessageProps {
    description: string,
    cta: string,
    purpose: string,
    option: string
}
export interface APIResponse {
    resultCode: number,
    resultMessage: string
}
export interface EyeSecurityDataProps {
    status: boolean,
    lastedUpdate: number
}
export interface E2EInfo {
    sessionKey?: string;
    screenName: string;
    serviceName: string;
    sourceFromTracking: string;
    miniAppTrackVer: number;
    canTrackScreenViewedEvent?: boolean;
    params?: {
        [key: string]: any;
    };
    backButtonParams?: {
        [key: string]: any;
    };
    toolkitParams?: {
        [key: string]: any;
    };
}
