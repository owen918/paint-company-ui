interface Prop {
  currentView: string;
}

const Header = ({ currentView }: Prop) => {
  return <h4>Paint Inventory -- {currentView}</h4>;
};

export default Header;
