export default function SearchBar({
  value,
  onChange
}) {

  return (
    <input
      placeholder="Search recordings..."
      value={value}
      onChange={onChange}
    />
  );
}