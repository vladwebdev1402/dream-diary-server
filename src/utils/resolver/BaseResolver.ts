export class BaseResolver {
  resolveSuccess<T>(data: T, message?: string) {
    return {
      success: true,
      ...data,
      message: message || 'запрос выполнен успешно',
    };
  }

  resolveCatch<T>(message?: string, data?: T) {
    return {
      success: false,
      message: message || 'Происзошла ошибка при выполнении запроса',
      ...data,
    };
  }
}
