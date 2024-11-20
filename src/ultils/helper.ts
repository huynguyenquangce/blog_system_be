import * as bcrypt from 'bcrypt';
const saltRounds = 10;

export const hashPassword = async (plainPassword: string) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(plainPassword, salt);
    return hashPassword.toString();
  } catch (error) {
    console.log(error);
  }
};

export const comparePass = async (plainPassword: string, ValidPass: string) => {
  try {
    const isMatch = bcrypt.compare(plainPassword, ValidPass);
    return isMatch;
  } catch (error) {}
};

export function paginateResponse(data, page, limit) {
  page = parseInt(page);
  const [result, total] = data;
  const lastPage = Math.ceil(total / limit);
  const nextPage = page + 1 > lastPage ? null : page + 1;
  const prevPage = page - 1 < 1 ? null : page - 1;
  return {
    statusCode: 'success',
    data: [...result],
    count: total,
    currentPage: page,
    nextPage: nextPage,
    prevPage: prevPage,
    totalPage: lastPage,
  };
}
