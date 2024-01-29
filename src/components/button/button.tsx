// Custom components
function Button(props: { name: string; small: boolean }) {
  const { name, small } = props;
  return (
    <button
      className={`linear ${
        small === true ? 'w-8' : 'w-20'
      }  text-bold py-3 text-base font-medium text-white text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 `}
      type="submit"
    >
      {name}
    </button>
  );
}

export default Button;
