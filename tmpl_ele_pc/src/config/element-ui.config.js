import Vue from 'vue'
import {
	Autocomplete,
	Dialog,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Menu,
	Submenu,
	MenuItem,
	MenuItemGroup,
	Input,
	Button,
	Alert,
	Icon,
	Row,
	Col,
	Carousel,
	CarouselItem,
	Collapse,
	CollapseItem,
	Cascader,
	Container,
	Header,
	Aside,
	Main,
	Loading,
	Footer,
	MessageBox,
	Message,
	Notification
} from 'element-ui';

Vue.use(Button);
Vue.use(Input);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cascader);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;