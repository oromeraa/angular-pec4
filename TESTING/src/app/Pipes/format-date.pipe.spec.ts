import { FormatDatePipe } from './format-date.pipe';

describe('FormatDatePipe', () => {
  let pipe: FormatDatePipe;
  const testDate = new Date(2026, 4, 18);

  beforeEach(() => {
    pipe = new FormatDatePipe();
  });

  it('Debería crear la instancia de la pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('Debería devolver ddmmyyyy cuando el tipo de formato es 1', () => {
    // Arrange
    const type = 1;

    // Act
    const formattedDate = pipe.transform(testDate, type);

    // Assert
    expect(formattedDate).toBe('18052026');
  });

  it('Debería devolver dd / mm / yyyy cuando el tipo de formato es 2', () => {
    // Arrange
    const type = 2;

    // Act
    const formattedDate = pipe.transform(testDate, type);

    // Assert
    expect(formattedDate).toBe('18 / 05 / 2026');
  });

  it('Debería devolver dd/mm/yyyy cuando el tipo de formato es 3', () => {
    // Arrange
    const type = 3;

    // Act
    const formattedDate = pipe.transform(testDate, type);

    // Assert
    expect(formattedDate).toBe('18/05/2026');
  });

  it('Debería devolver yyyy-mm-dd cuando el tipo de formato es 4', () => {
    // Arrange
    const type = 4;

    // Act
    const formattedDate = pipe.transform(testDate, type);

    // Assert
    expect(formattedDate).toBe('2026-05-18');
  });
});
