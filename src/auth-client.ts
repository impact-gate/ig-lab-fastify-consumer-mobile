export class AuthClient {
  constructor(private fastifyUrl: string) {}

  async getCurrentProfile(sessionToken: string) {
    const res = await fetch(`${this.fastifyUrl}/v1/users/me`, {
      headers: { Authorization: `Bearer ${sessionToken}` },
    });
    const user = (await res.json()) as any;
    // Guarded access via nullish coalescing
    const token = user.legacyToken ?? user.authToken ?? "GUEST";
    return { id: user.id, username: user.username, token };
  }
}
