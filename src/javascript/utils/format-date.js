function getDateAgo(days) {
  let date = new Date();
  date = new Date(date);
  date.setDate(date.getDate() - days);
  return date.toISOString().slice(0, 10);
}

const weekAgo = getDateAgo(7);
const today = getDateAgo(0);

const dates = {
  from: weekAgo,
  to: today,
};

export default dates;
