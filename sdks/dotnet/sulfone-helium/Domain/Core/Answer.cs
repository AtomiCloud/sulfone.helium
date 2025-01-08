namespace sulfone_helium.Domain.Core;

public interface IAnswer { }

public record StringArrayAnswer(string[] Answer) : IAnswer;

public record StringAnswer(string Answer) : IAnswer;

public record BoolAnswer(bool Answer) : IAnswer;
