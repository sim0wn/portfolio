import { AntennaIcon, RadioTowerIcon, WavesIcon } from "lucide-react"
import { JSX } from "react"

export enum Role {
  TX,
  RX,
  FREE_SPACE,
}

interface IWirelessLinkComponent {
  description: string
  getEffectiveValue(extra?: object): number
  getValue(): number
  icon?: JSX.Element
  multiplier?: Multiplier
  name: string
  role: Role
  setValue(value: number): void
  unit?: string
}

type Multiplier = {
  unit: string
  value: number
}

export class Antenna implements IWirelessLinkComponent {
  public icon = (<AntennaIcon />)
  public unit = "dBi"

  constructor(
    public name: string,
    public description: string,
    public role: Role,
    public dBi: number,
  ) {}

  getEffectiveValue(): number {
    return this.dBi
  }

  getValue() {
    return this.dBi
  }

  setValue(value: number) {
    this.dBi = value
  }
}

export class FreeSpace implements IWirelessLinkComponent {
  public icon = (<WavesIcon />)
  public role = Role.FREE_SPACE
  public unit = "km"

  constructor(
    public name: string,
    public description: string,
    public distance: number,
    public multiplier: Multiplier = {
      unit: "GHz",
      value: 1,
    },
  ) {}

  // Free space path loss formula: FSPL(dB) = 20 * log10(d) + 20 * log10(f) + 92.45
  getEffectiveValue(): number {
    if (this.distance <= 0 || this.multiplier.value <= 0) return 0
    return 92.5 + 20 * Math.log10(this.distance * this.multiplier.value)
  }

  getValue() {
    return this.distance
  }

  setValue(value: number) {
    this.distance = value
  }
}

export class LinkBudgetManager {
  constructor(private linkComponents: IWirelessLinkComponent[] = []) {}

  public addComponent(linkComponent: IWirelessLinkComponent) {
    this.linkComponents.push(linkComponent)
  }

  public getComponents() {
    return this.linkComponents
  }

  public getEffectiveRadiatedPower() {
    const txRadio = this.linkComponents.find(
      (linkComponent) =>
        linkComponent.role === Role.TX &&
        linkComponent instanceof RadioComponent,
    )
    const txAntenna = this.linkComponents.find(
      (linkComponent) =>
        linkComponent.role === Role.TX && linkComponent instanceof Antenna,
    )
    const txLosses = this.getLosses(Role.TX)

    const apPower = txRadio ? txRadio.getEffectiveValue() : 0
    const antennaGain = txAntenna ? txAntenna.getEffectiveValue() : 0

    return apPower - txLosses + antennaGain
  }

  public getEffectiveSensitivity() {
    const sensitivity = this.linkComponents.reduce((total, c) => {
      if (c.role === Role.RX && c instanceof RadioComponent) {
        return total + c.getEffectiveValue()
      }
      return total
    }, 0)

    const gain = this.linkComponents.reduce((total, c) => {
      if (c.role === Role.RX && c instanceof Antenna) {
        return total + c.getEffectiveValue()
      }
      return total
    }, 0)
    const rxLosses = this.getLosses(Role.RX)

    return gain - rxLosses + sensitivity
  }

  public getFadeMargin() {
    return parseFloat(
      (
        this.getEffectiveRadiatedPower() -
        this.getPathLoss() +
        this.getEffectiveSensitivity()
      ).toFixed(2),
    )
  }

  public getPathLoss() {
    return this.linkComponents.reduce((totalSpaceLoss, component) => {
      if (component.role === Role.FREE_SPACE) {
        return totalSpaceLoss + component.getEffectiveValue()
      }
      return totalSpaceLoss
    }, 0)
  }

  public removeComponent(index: number) {
    this.linkComponents.splice(index, 1)
  }

  private getLosses(role: Role) {
    return this.linkComponents
      .filter(
        (component) =>
          component.role === role && component instanceof PassiveComponent,
      )
      .reduce((total, component) => total + component.getEffectiveValue(), 0)
  }
}

export class PassiveComponent implements IWirelessLinkComponent {
  public unit = "dB"

  constructor(
    public name: string,
    public description: string,
    public role: Role,
    public dB: number,
    public icon?: JSX.Element,
    public multiplier?: Multiplier,
  ) {}

  getEffectiveValue(): number {
    if (this.multiplier) {
      return this.dB * this.multiplier.value
    }
    return this.dB
  }

  getValue() {
    return this.dB
  }

  setValue(value: number) {
    this.dB = value
  }
}

export class RadioComponent implements IWirelessLinkComponent {
  public icon = (<RadioTowerIcon />)
  public unit = "dBm"

  constructor(
    public name: string,
    public role: Role,
    public dBm: number,
    public description: string,
  ) {}

  getEffectiveValue() {
    return this.dBm
  }

  getValue() {
    return this.dBm
  }

  setValue(value: number) {
    this.dBm = value
  }
}
