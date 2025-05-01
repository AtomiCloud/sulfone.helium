using sulfone_helium.Domain.Core.Questions;

namespace sulfone_helium.Domain.Core;

public interface IInquirer
{
    Task<string[]> Checkbox(CheckboxQ q);
    Task<string[]> Checkbox(string q, string[] options, string id, string? help = null);
    Task<bool> Confirm(ConfirmQ q);
    Task<bool> Confirm(string q, string id, string? help = null);
    Task<string> Password(PasswordQ q);
    Task<string> Password(string q, string id, string? help = null);
    Task<string> Select(SelectQ q);
    Task<string> Select(string q, string[] options, string id, string? help = null);
    Task<string> Text(TextQ q);
    Task<string> Text(string q, string id, string? help = null);
    Task<DateOnly> DateSelect(DateQ q);
    Task<DateOnly> DateSelect(string question, string id, string? help = null);
}
